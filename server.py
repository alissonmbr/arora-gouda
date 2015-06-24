from flask import Flask
from flask import jsonify
from flask import render_template
from flask import request
from flask import abort
import arora_gouda

app = Flask(__name__)

@app.route('/arora-gouda/add-node', methods = ['POST'])
def add_node():
    result = arora_gouda.add_node(request.json) 
    if result:
        return jsonify(result)
    else:
        return jsonify({})

@app.route('/arora-gouda/remove-node', methods = ['POST'])
def remove_node():
    result = arora_gouda.remove_node(request.json)
    if result:
        return jsonify(result)
    else:
        return jsonify({})

@app.route('/arora-gouda/add-edge', methods = ['POST'])
def add_edge():    
    result = arora_gouda.add_edge(request.json)
    if result:
        return jsonify(result)
    else:
        return jsonify({})

@app.route('/arora-gouda/remove-edge', methods = ['POST'])
def remove_edge():    
    result = arora_gouda.remove_edge(request.json)
    if result:
        return jsonify(result)
    else:
        return jsonify({})

@app.route('/arora-gouda/clear', methods = ['POST'])
def clear():
    result = arora_gouda.clear()
    if result:
        return jsonify(result)
    else:
        return jsonify({})

@app.route('/')
def home():
    arora_gouda.clear()
    return render_template('index.html')

if __name__ == '__main__':
    print 'Started server'    
    app.run(debug = True)
