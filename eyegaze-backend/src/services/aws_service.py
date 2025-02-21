import os
import boto3
from dotenv import load_dotenv
from botocore.exceptions import NoCredentialsError

# Load environment variables
load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

if not AWS_ACCESS_KEY_ID or not AWS_SECRET_ACCESS_KEY:
    raise Exception("AWS credentials are missing. Please check your .env file.")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)

def upload_to_s3(data, key: str, content_type: str = "image/jpeg"):
    """
    Upload data (bytes or file object) to S3. Returns True if successful.
    """
    try:
        # Handle file object
        if hasattr(data, 'read'):
            file_content = data.read()
        else:
            file_content = data

        # Convert string to bytes if needed
        if isinstance(file_content, str):
            file_content = file_content.encode("utf-8")
        elif not isinstance(file_content, bytes):
            raise ValueError(f"Expected bytes-like object, got {type(file_content)} instead.")

        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=key,
            Body=file_content,
            ContentType=content_type
        )
        return True
    except NoCredentialsError:
        print("AWS credentials not found.")
        return False
    except Exception as e:
        print(f"Error uploading to S3: {e}")
        return False

def download_from_s3(key: str):
    """
    Download data from S3 by key. Returns file content as bytes.
    """
    try:
        response = s3_client.get_object(Bucket=BUCKET_NAME, Key=key)
        return response["Body"].read()
    except s3_client.exceptions.NoSuchKey:
        raise Exception(f"File not found in S3 for key: {key}")
    except Exception as e:
        raise Exception(f"Error downloading from S3: {e}")
