from flask import request, current_app
from flask_restful import Resource
from app.config_flask import SECRET_KEY, QRCode_FOLDER, server_ip
from werkzeug.utils import secure_filename
from app.config_db import get_db_connection
import qrcode
import json
import os


class QrGenerator(Resource):
    def post(self):
        data = request.form
        
        if any(value == "" for value in data.values()):
            return {"message": "All fields must be filled"}, 400
        
        required_fields = ["AssetID", "AssetName", "AssetDesc", "AssetBrand", "AssetModel", "AssetStatus", "AssetLocation", "AssetCategory", "AssetSN"]
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return {"message": f"Missing required fields: {', '.join(missing_fields)}"}, 400

        asset_id = data["AssetID"]
        save_path = os.path.join(current_app.config['QRCode_FOLDER'], asset_id)

        # Memeriksa apakah folder sudah ada
        if os.path.exists(save_path):
            return {"message": f"AssetID {asset_id} has been used. Use another AssetID."}, 400

        # Membuat folder
        os.makedirs(save_path, exist_ok=True)

        data_to_save = {
            "AssetID": asset_id,
            "AssetName": data["AssetName"],
            "AssetDesc": data["AssetDesc"],
            "AssetBrand": data["AssetBrand"],
            "AssetModel": data["AssetModel"],
            "AssetStatus": data["AssetStatus"],
            "AssetLocation": data["AssetLocation"],
            "AssetCategory": data["AssetCategory"],
            "AssetSN": data["AssetSN"]
        }
        
        json_data = json.dumps(data_to_save)
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(json_data)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img.save(os.path.join(save_path, asset_id + '.png'))
        
        link = f"https://sipanda.online:8443/static/QRCode/{asset_id}/{asset_id}.png"
        return {"message": "QR Code has been created", "qr": link}, 200

class QrScanner(Resource):
    def post(self):
        data = request.json
        
        if any(value == "" for value in data.values()):
            return {"message": "All fields must be filled"}, 400
        
        required_fields = ["AssetID", "AssetName", "AssetDesc", "AssetBrand", "AssetModel", "AssetStatus", "AssetLocation", "AssetCategory", "AssetSN"]
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return {"message": f"Missing required fields: {', '.join(missing_fields)}"}, 400
        
        AssetID = data["AssetID"]
        AssetName = data["AssetName"]
        AssetDesc=  data["AssetDesc"]
        AssetBrand = data["AssetBrand"]
        AssetModel = data["AssetModel"]
        AssetStatus = data["AssetStatus"]
        AssetLocation = data["AssetLocation"]
        AssetCategory = data["AssetCategory"]
        AssetSN = data["AssetSN"]
            
        db, lmd = get_db_connection()
        
        # Periksa apakah AssetID sudah ada
        lmd.execute('SELECT COUNT(*) FROM assets WHERE asset = %s', (AssetID,))
        validate = lmd.fetchone()[0]
        
        if validate > 0:
            lmd.close()
            return {"message": "AssetID already in use"}, 409
        
        try:
            # Masukkan data ke dalam tabel assets
            image_path = (current_app.config['server_ip'] + '/static/Default/images.jfif')
            lmd.execute('INSERT INTO assets (asset, name, description, brand, model, status, location, category, serialnumber, photo) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (AssetID, AssetName, AssetDesc, AssetBrand, AssetModel, AssetStatus, AssetLocation, AssetCategory, AssetSN, image_path))
            
            db.commit()
            lmd.close()
            
            return {"message": "QR Code successfully, Asset has been inputed"}
        except Exception as e:
            db.rollback()
            Error = ("message:", (str(e)))
            return {"message": {"message": Error}}, 409