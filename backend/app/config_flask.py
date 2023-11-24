import os

SECRET_KEY = os.environ.get('SECRET_KEY', 'lmd%055@2022')
server_ip = os.environ.get('server_ip', 'https://sipanda.online:8443')
UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', './app/static/upload/')
QRCode_FOLDER = os.environ.get('QRCode_FOLDER', './app/static/QRCode/')
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
