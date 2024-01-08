output "bucket_arn" {
    description                 = "ARN of the test bucket"
    value                       = aws_s3_bucket.test_bucket.arn
}