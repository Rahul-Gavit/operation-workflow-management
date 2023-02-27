from flask import Flask,request 
import pymysql
from flask_cors import CORS

import threading
lock = threading.Lock()
import json 

app = Flask(__name__)

UPLOAD_FOLDER = 'static/files/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
UPLOAD_KEY = 'static/keys/'
app.config['UPLOAD_KEY'] = UPLOAD_KEY

CORS(app)
app.secret_key = 'any random string'

def dbConnection():
    try:
        connection = pymysql.connect(host="localhost", user="root", password="root", database="operationalflow")
        return connection
    except:
        print("Something went wrong in database Connection")

def dbClose():
    try:
        dbConnection().close()
    except:
        print("Something went wrong in Close DB Connection")

con = dbConnection()
cursor = con.cursor()

"----------------------------------------------------------------------------------------------------"

@app.route('/userRegister', methods=['GET', 'POST'])
def userRegister():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        mobile = data.get('mobile')
        password = data.get('password')
        typeofemp = data.get('type')
        
        cursor.execute('SELECT * FROM users WHERE username = %s and type = %s', (username,typeofemp))
        count = cursor.rowcount
        if count == 1:        
            return "fail"
        else:
            sql1 = "INSERT INTO users(username, email, mobile, password, type) VALUES (%s, %s, %s, %s, %s);"
            val1 = (username, email, mobile, password, typeofemp)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"

@app.route('/userLogin', methods=['GET', 'POST'])
def userLogin():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        typeofemp = data.get('type')
        
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s AND type = %s', (username, password, typeofemp))
        count = cursor.rowcount
        if count == 1:        
            return "success"
        else:
            return "fail"
    return "fail"

@app.route('/addFormDetails', methods=['GET', 'POST'])
def addFormDetails():
    if request.method == 'POST':
        data = request.get_json()
        
        typeofform = data.get('typeofform')
        formval = data.get('formval')
               
        cursor.execute('SELECT * FROM formdetails WHERE typeofform = %s', (typeofform))
        count = cursor.rowcount
        if count > 0:
            sql1 = "UPDATE formdetails SET formval = %s WHERE typeofform = %s;"
            val1 = (str(formval),typeofform)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
        else:
            sql1 = "INSERT INTO formdetails(typeofform, formval) VALUES (%s, %s);"
            val1 = (typeofform, str(formval))
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"

@app.route('/loadForms/<typeofform>', methods=['GET', 'POST'])
def loadFiles(typeofform):
    try:
        # print(typeofform)
        
        lock.acquire()        
        cursor.execute('SELECT * FROM formdetails WHERE typeofform = %s', (typeofform))
        row = cursor.fetchall() 
        lock.release()
        
        jsonObj = json.dumps(row) 
        return jsonObj
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/UserApplyForm', methods=['GET', 'POST'])
def UserApplyForm():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        usertype = data.get('usertype')
        inputval = data.get('listofinputs')
        whoaccess = data.get('checks')
        typeofapply = data.get('typeofform')
        
        cursor.execute('SELECT * FROM userapply WHERE username = %s and usertype = %s and typeofapply = %s', (username,usertype,typeofapply))
        count = cursor.rowcount
        if count > 0:        
            return "fail"
        else:
            for i in whoaccess.split('-'):
                sql1 = "INSERT INTO userapply(username, usertype, inputval, whoaccess, typeofapply) VALUES (%s, %s, %s, %s, %s);"
                val1 = (username, usertype, str(inputval), str(i), typeofapply)
                cursor.execute(sql1,val1)
                con.commit()
            return "success"
    return "fail"

@app.route('/loadRequest/<typeofuser>', methods=['GET', 'POST'])
def loadRequest(typeofuser):
    try:
        
        lock.acquire()        
        cursor.execute('SELECT * FROM userapply WHERE whoaccess = %s and status="None"',(typeofuser))
        row = cursor.fetchall() 
        lock.release()
        
        jsonObj = json.dumps(row) 
        return jsonObj
    
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/updateStatus', methods=['GET', 'POST'])
def updateStatus():
    if request.method == 'POST':
        data = request.get_json()
        
        idofr = data.get('id')
        username = data.get('username')
        typeofapp = data.get('typeofapp')
        status = data.get('status')
        
        sql1 = "UPDATE userapply SET status = %s WHERE id = %s and username = %s and typeofapply = %s;"
        val1 = (status,idofr,username,typeofapp)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"
    
    return "fail"

@app.route('/loadStatuslst/<user>', methods=['GET', 'POST'])
def loadStatuslst(user):
    try:
        
        lock.acquire()        
        cursor.execute('SELECT username,usertype,whoaccess,typeofapply,status FROM userapply WHERE username = %s and status!="None"',(user))
        row = cursor.fetchall() 
        lock.release()
        
        plist=[]
        llist=[]
        alist=[]
        
        for i in row:
            if i[3] == 'Promotion':
                plist.append(i)
            elif i[3] == 'Leave':
                llist.append(i)
            else:
                alist.append(i)
        
        jsonObj = json.dumps([plist,llist,alist]) 
        return jsonObj
    
    except Exception as ex:
        print(ex)                 
        return ""

    
if __name__ == "__main__":
    app.run("0.0.0.0")
    
    # https://www.robinwieruch.de/react-checkbox/
    # https://codesandbox.io/s/dynamic-progressbar-forked-pqoi81?file=/package.json
    
    
