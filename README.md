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

# Cognito
ap-northeast-1_dDwYBmmmu
30c33rdn8m8o0d5rnjuql8qv4p
ap-northeast-1:0e869897-121f-4ea4-b934-f4117dbc0dec