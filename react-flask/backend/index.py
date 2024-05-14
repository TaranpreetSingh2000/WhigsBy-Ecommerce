# from flask import Flask, request, jsonify, Blueprint
# from flask_cors import CORS
# import razorpay
# import hashlib
# import os

# app = Flask(__name__)
# CORS(app)

# razorpay_app = Blueprint('razorpay_app', __name__)

# razorpay_client = razorpay.Client(auth=('rzp_test_cna65wiH3I4Bvv', 'QPyKvUxkgkbQwx7opQZFH37c'))

# @razorpay_app.route('/order', methods=['POST'])
# def create_order():
#     try:
#         options = request.json
#         order = razorpay_client.order.create(options=options)
#         return jsonify(order)
#     except Exception as e:
#         print(e)
#         return jsonify(error='Error creating order'), 500

# @razorpay_app.route('/order/validate', methods=['POST'])
# def validate_order():
#     try:
#         razorpay_order_id = request.json.get('razorpay_order_id')
#         razorpay_payment_id = request.json.get('razorpay_payment_id')
#         razorpay_signature = request.json.get('razorpay_signature')

#         signature = hashlib.sha256(f"{razorpay_order_id}|{razorpay_payment_id}".encode()).hexdigest()

#         if signature != razorpay_signature:
#             return jsonify(msg='Transaction is not legit!'), 400

#         return jsonify(msg='success', orderId=razorpay_order_id, paymentId=razorpay_payment_id)
#     except Exception as e:
#         print(e)
#         return jsonify(error='Error validating order'), 500

# if __name__ == '__main__':
#     app.run(port=5000)
