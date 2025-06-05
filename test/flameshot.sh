#!/bin/bash

# File details
FILE="$(pwd)/tux.jpg"

if [[ ! -f "$FILE" ]]; then
    echo "Error: File $FILE does not exist."
    exit 1
fi

# ass/cheek configuration (domain should be saved without http(s)://)
TOKEN=foobar
DOMAIN=127.0.0.1:6969

takeScreenshot() {
	#REQUIRED_TOOLS=("flameshot" "curl" "xclip" "notify-send")

	# Check if the proper tools are installed
	#for tool in "${REQUIRED_TOOLS[@]}"; do
	#	if ! check_tool "$tool"; then
	#		echo "Error: $tool is missing!"
	#		exit 1
	#	fi
	#done

	# Upload file
	echo "Uploading $FILE to yaass..."

	# Configure upload fields
	FIELD="$([[ $MODE -eq 0 ]] && echo "file" || echo "image")=@$FILE"
	[[ "${DOMAIN%%:*}" = "127.0.0.1" ]] && PROTOCOL="http" || PROTOCOL="https"
	POSTTO="$PROTOCOL://$DOMAIN/upload"

	# Upload the file
	URL=$(curl -sS -X POST \
	  -H "Content-Type: multipart/form-data" \
	  -H "Accept: application/json" \
	  -H "User-Agent: Test" \
	  -H "Authorization: $TOKEN" \
	  -F file=@$FILE $POSTTO
	)

	# Response parser unique to ass
	URL=$(echo $URL | grep -Po '(?<="url":")[^"]+')
	echo $URL
}

takeScreenshot