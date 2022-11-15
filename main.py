from util import generate_img

import json
from flask import request
from flask import Flask, render_template


app = Flask(
    __name__,
    # static_folder='templates/assets/images',
    )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/example.php')
def phpexample():
    return render_template('contact.php')


@app.route('/test', methods=['POST'])
def test():
    output = request.get_json()
    print(output) # This is the output that was stored in the JSON within the browser
    print(type(output))
    result = json.loads(output) #this converts the json output to a python dictionary
    print(result) # Printing the new dictionary
    print(type(result))#this shows the json converted as a python dictionary
    with open('data.json', 'w') as f:
        json.dump(result, f)
    generate_img(
        result['harpnum'],
        result['date'][0:4]+result['date'][5:7]+result['date'][8:10],
        result['hour'],
        result['minute'],
        result['color_option'],
    )
    return result



if __name__ == "__main__":
    app.run(debug=True)


