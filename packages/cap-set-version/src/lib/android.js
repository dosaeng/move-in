const fs = require('fs');
const path = require('path');

const ANDROID_CONFIG_FILE = 'android/app/build.gradle';

exports.setAndroidVersionAndBuild = (dir, version, build) => {
  const gradleBuildFilePath = path.join(dir, ANDROID_CONFIG_FILE);
  let file = openGradleFile(gradleBuildFilePath);

  // If neither type of file exist, throw an error
  if (file === null) {
    throw new Error('Failed to find a build.gradle file.');
  }

  file = setAndroidVersion(file, version);
  file = setAndroidBuild(file, build);

  fs.writeFileSync(gradleBuildFilePath, file, 'utf-8');
};

function openGradleFile(gradleBuildFilePath) {
  try {
    return fs.readFileSync(gradleBuildFilePath, 'utf-8');
  } catch (error) {
    throw new Error('Failed to find a build.gradle file.');
  }
}

function setAndroidVersion(file, version) {
  if (!file.match(/(versionName).*/g)) {
    throw new Error(
      `Could not find "versionName" in android/app/build.grade file`
    );
  }

  const replaceValue = `versionName "${version}"`;

  return file.replace(/(versionName).*/g, replaceValue);
}

function setAndroidBuild(file, build) {
  if (!file.match(/(versionCode).*/g)) {
    throw new CustomError(
      `Could not find "versionCode" in android/app/build.grade file`
    );
  }

  const replaceValue = `versionCode ${build}`;

  return file.replace(/(versionCode).*/g, replaceValue);
}
