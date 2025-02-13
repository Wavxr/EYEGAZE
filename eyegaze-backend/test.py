import boto3
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize S3 client
s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION"),
)

BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")
FILE_KEY = "landing_pages/ccfc7dc0-2c90-42a1-b287-881b45c1556c_index.html"

try:
    response = s3_client.get_object(Bucket=BUCKET_NAME, Key=FILE_KEY)
    file_content = response["Body"].read()
    print(f"File found! Content (first 500 bytes): {file_content[:500]}")
except s3_client.exceptions.NoSuchKey:
    print(f"Error: File {FILE_KEY} not found in S3.")
except Exception as e:
    print(f"Error downloading from S3: {str(e)}")
