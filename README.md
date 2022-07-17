# YourColor
あなたのバースデーカラーをお調べするWEBアプリ

# local server kick
$ cd public
$ python -m http.server 9292
-> localhost:9292 にアクセス

# create S3
$ aws --profile Administrator s3 mb s3://yourcolor.nishi8024.com

# deploy S3
$ aws --profile Administrator s3 sync public/ s3://yourcolor.nishi8024.com --acl public-read

# Endpoint S3
http://yourcolor.nishi8024.com.s3-website-ap-northeast-1.amazonaws.com/