GCP Pocs 1
  gcp-react-node-datastore-poc - 
    This POC includes the React Basic which just call the cloud funtions(APIs) from web and displays the content on UI.
    The Cloud function is written in NodeJs 14, Used ExpressJs as server and expose 4 APIs (Crete, Read, Update, List).
    while configuring the cloud funtion, entry point = 'app', which is exported variable from expresJs application
    
    The 'Task' entity should be created in datastore, if now, it will be created when the first record will be created from UI or API.
  
