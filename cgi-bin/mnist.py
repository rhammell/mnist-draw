#!/home/rhammell/Python-3.4.3/python

import io
import cgi
import json
import sys
import os
import random
import re
import base64
import numpy as np
from PIL import Image
from model import model


try:

    # Get post data
    if os.environ["REQUEST_METHOD"] == "POST":
        data = sys.stdin.read(int(os.environ["CONTENT_LENGTH"]))

        # Convert data url to numpy array
        img_str = re.search(r'base64,(.*)', data).group(1)
        image_bytes = io.BytesIO(base64.b64decode(img_str))
        im = Image.open(image_bytes)
        arr = np.array(im)[:,:,0:1]

        # Normalize and invert pixel values
        arr = (255 - arr) / 255.

        # Load trained model
        model.load('cgi-bin/models/model.tfl')

        # Predict class
        prediction = model.predict([arr])[0]

        # Results  
        res = { "result": 1,
            "data":  [float(num) for num in prediction],
            "test": 'test1', 
            "data2": 'tes',
            "data3": data } #}
except:
     res = { "result": 0 }

print("Content-type: application/json")
print("") 
print(json.dumps(res))


