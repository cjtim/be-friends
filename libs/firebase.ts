import { config } from 'config'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

export const getBucket = () => {
  if (!getApps().length) {
    initializeApp({
      storageBucket: config.google.bucketName,
      projectId: config.google.projectId,
      apiKey: config.google.mapApiKey,
    })
  }
  // Get a reference to the storage service, which is used to create references in your storage bucket
  return getStorage(getApp())
}

export default getBucket
