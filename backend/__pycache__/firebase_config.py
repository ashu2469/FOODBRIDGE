import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def verify_token(token: str):
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception:
        return None