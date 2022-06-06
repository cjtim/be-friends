#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ "[no build]" ]]; then
    echo "Found No Build commit message"
    exit 0
fi

exit 1