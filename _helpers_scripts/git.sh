#!/bin/bash
# Git commiting script for all changes at once for current branch
# Papu Kumar <papuruth@gmail.com>
# Dated: 23/03/2020
if [[ $1 && $2 ]]; then
    # Setting config
    git config user.email "papuruth@gmail.com"
    git config user.name "Papu Kumar"
    
    # Adding files
    git add .

    # Commit message
    git commit -m "$1"

    # Push the changes to remote branch
    git push origin $2
else
    echo "Please enter a commit message and branch name"
    exit 128
fi
