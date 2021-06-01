//https://stackoverflow.com/questions/57838179/im-trying-to-make-use-of-the-service-worker-in-create-react-app-but-i-keep-gett/61776698#61776698
self.addEventListener('message', async (event) => {
  console.log('Got message in the service worker', event);
});