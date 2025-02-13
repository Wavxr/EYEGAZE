import os
import boto3
from dotenv import load_dotenv
from botocore.exceptions import NoCredentialsError

# Load environment variables from .env file
load_dotenv()

# Retrieve AWS credentials
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

# Debugging: Check if credentials are loaded
print(f"AWS_ACCESS_KEY_ID: {AWS_ACCESS_KEY_ID}")
print(f"AWS_SECRET_ACCESS_KEY: {'Loaded' if AWS_SECRET_ACCESS_KEY else 'Not Found'}")

# Ensure credentials are available
if not AWS_ACCESS_KEY_ID or not AWS_SECRET_ACCESS_KEY:
    raise Exception("AWS credentials are missing. Please check your .env file.")

# Initialize S3 client
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)

def upload_to_s3(data, key: str, content_type: str = "application/octet-stream"):
    """
    Uploads data to S3 and returns the file URL.
    """
    try:
        if isinstance(data, str):
            data = data.encode("utf-8")  # Convert string to bytes
        elif not isinstance(data, bytes):
            raise ValueError(f"Expected bytes-like object, got {type(data)} instead.")

        print(f"upload_to_s3() - Data type after conversion: {type(data)}")
        print(f"upload_to_s3() - Data length after conversion: {len(data)}")

        s3_client.put_object(Bucket=BUCKET_NAME, Key=key, Body=data, ContentType=content_type)
        return f"https://{BUCKET_NAME}.s3.amazonaws.com/{key}"
    except NoCredentialsError:
        raise Exception("AWS credentials not found")
    except Exception as e:
        raise Exception(f"Error uploading to S3: {e}")

def download_from_s3(key: str):
    """
    Downloads data from S3.
    """
    try:
        response = s3_client.get_object(Bucket=BUCKET_NAME, Key=key)
        return response["Body"].read()
    except NoCredentialsError:
        raise Exception("AWS credentials not found")
    except Exception as e:
        raise Exception(f"Error downloading from S3: {e}")
