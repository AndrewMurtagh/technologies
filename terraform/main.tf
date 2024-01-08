terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~> 4.16"
        }
    }

    required_version = ">= 1.2.0"
}

provider "aws" {
    region = "us-west-2"
}

module "s3" {
    source                  = "./s3"
    bucket_name             = var.bucket_name
    tags                    = var.tags
}