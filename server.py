
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/data.json', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'POST':
        data = request.get_json()
        with open('data.json', 'w') as f:
            json.dump(data, f, indent=2)
        return jsonify({"status": "success"})
    else:
        with open('data.json') as f:
            return jsonify(json.load(f))

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/admin')
def admin():
    return app.send_static_file('admin.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
