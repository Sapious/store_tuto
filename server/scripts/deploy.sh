cd ../../client
npm run build
cp -r build ../server
cd ..
git add .
git commit -m "$1"
git push origin master
git push heroku master