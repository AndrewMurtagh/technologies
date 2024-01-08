
variable "bucket_name" {
    description             = "Name of the test bucket"
    type                    = string
    default                 = "test-bucket"
}

variable "tags" {
    description             = "Tags to set on the test bucket"
    type                    = map(string)
    default = {
        Terraform           = "true"
        Environment         = "testing"
        Name                = "testing"
    }
}