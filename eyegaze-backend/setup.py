# setup.py
from setuptools import setup, find_packages

setup(
    name="eyegaze-backend",
    version="0.1.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "fastapi",
        "uvicorn",
        "pyppeteer",
        "firebase-admin",
        "boto3",
        "python-dotenv",
    ],
)