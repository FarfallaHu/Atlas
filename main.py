from util import generate_img

import json
from flask import request
from flask import Flask, render_template, redirect, url_for


app = Flask(
    __name__,
    # static_folder='templates/assets/images',
    )
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.after_request
def add_header(response):
    # response.cache_control.no_store = True
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/example.php')
def phpexample():
    return render_template('contact.php')


@app.route('/test', methods=['POST'])
def test():

    output = request.get_json()
    print("input:", output) # This is the output that was stored in the JSON within the browser
    # print(type(output))
    result = json.loads(output) #this converts the json output to a python dictionary
    print("result:", result) # Printing the new dictionary
    # print(type(result))#this shows the json converted as a python dictionary
    #with open('data.json', 'w') as f:
    #    json.dump(result, f)
    output = generate_img(
        result['harpnum'],
        result['date'][0:4]+result['date'][5:7]+result['date'][8:10],
        result['hour'],
        result['minute'],
        result['color_option'],
    )
    print("F:", output)

    if output==1:
        return result
    else:
        return "0"
    #return redirect(url_for('static', filename='images/banner/temp.png'))
    #return render_template('index.html', static='images/banner/temp.png')



if __name__ == "__main__":
    app.run(debug=True)


