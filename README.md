# contact-management-system

Commands to start the Server:-

    * npm i (Download the node modules files)
    * npm start (To start the server)
    * make a .env file (Details of file added below)

Authentication Routes:-

    POST /auth/token  Getting token for using the below routes
                body : email(suhas@gmail.com) , password(123)
    
Contact Routes:-

    POST /contact/add Adding a contact
                body : name , phone_number
    
    POST /contact/add/many Adding contacts in bulk
                body : Array of name , phone_number
    
    GET /contact/details Getting contact details 
                body: name

    GET /contact/search Search contact with given phase
                body: name
    
    POST /contact/update Update a Contact
                body: name , phone_number

    POST /contact/delete Delete a Contact
                body : phone_number
    
    GET /contact/list get list of all Contacts with pagination
                

.env file :-


SECRET_TOKEN = ljkdgjcjfg9823r76235rt723hoejp23hofguivh2j3rkl329y238t0r79fvbriwdfe
