# Terraform

We use tflocal and awslocal and Localstack to emulate a AWS environment.

```
brew install localstack/tap/localstack-cli

localstack start
```

<!-- export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY= -->


```
terraform init

terraformlocal plan
terraformlocal apply

awslocal s3 ls

tflocal output


tflocal destroy
```


https://developer.hashicorp.com/terraform/tutorials/configuration-language/resource


<!-- awslocal s3 mb s3://my-first-bucket -->
