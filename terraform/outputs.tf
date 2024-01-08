output "bucket_arn" {
    description                 = "ARN of the test bucket"
    value                       = module.s3.bucket_arn
}