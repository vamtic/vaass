#!/bin/bash

# yaass details
TOKEN=${YAASS_TOKEN:-foobar}  # Use environment variable if available
DOMAIN=127.0.0.1:6969

# File details
FILE="${1:-$(pwd)/tux.jpg}"  # Allow file path as an argument

if [[ ! -f "$FILE" ]]; then
    echo "Error: File $FILE does not exist."
    exit 1
fi

uploadFile() {
	echo "Uploading $FILE to yaass..."

	# Configure upload fields
	[[ "${DOMAIN%%:*}" = "127.0.0.1" ]] && PROTOCOL="http" || PROTOCOL="https"
	POSTTO="$PROTOCOL://$DOMAIN/upload"

    # Upload the file
    RESPONSE=$(curl -sS -X POST \
      -H "Content-Type: multipart/form-data" \
      -H "Accept: application/json" \
      -H "User-Agent: Test" \
      -H "Authorization: $TOKEN" \
      -F file=@$FILE "$POSTTO")

    # Check for curl errors
    if [[ $? -ne 0 ]]; then
        echo "Error: Failed to upload the file."
        exit 1
    fi

    # Response parser using jq
    URL=$(echo "$RESPONSE" | jq -r '.url')
    echo "$URL"
}

uploadFile