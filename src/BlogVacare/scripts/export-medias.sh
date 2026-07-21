#!/usr/bin/env bash
set -euo pipefail

# Depuis la racine du projet
BACK_MEDIA_DIR="../../src-back/storage/app/public/post-medias"
FRONT_MEDIA_DIR="./public/assets/BlogVacare/Community/post-medias"

if [ ! -d "$BACK_MEDIA_DIR" ]; then
  echo "Dossier source introuvable : $BACK_MEDIA_DIR"
  exit 0
fi

mkdir -p "$FRONT_MEDIA_DIR"

# Copie récursive sans écraser les fichiers plus récents
rsync -avu "$BACK_MEDIA_DIR"/ "$FRONT_MEDIA_DIR"/