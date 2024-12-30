from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Track order history
order_history = []

@app.route('/order', methods=['POST'])
def process_order():
    data = request.json
    order = data.get('order', [])
    total = sum(int(item['price']) for item in order)
    
    # Log the order
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    order_entry = {"timestamp": timestamp, "order": order, "total": total}
    order_history.append(order_entry)
    
    # Print logs to the server console
    print(f"Order received at {timestamp}: {order}")
    print(f"Total: Rs.{total}")
    
    return jsonify({"total": total, "message": "Order received!"})

@app.route('/orders', methods=['GET'])
def get_order_history():
    return jsonify(order_history)

if __name__ == '__main__':
    app.run(debug=True) 
