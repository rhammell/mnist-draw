# mnist-draw
This repository contains a single page website that enables users to draw and classify digits (0-9) using machine learning. Included is a TFLearn model trained against the MNIST dataset, 

# Setup 
Python 3.5+ is required for compatability with all required modules

```bash
# Clone this repository
git clone https://github.com/rhammell/mnist-draw.git

# Go into the repository
cd mnist-draw

# Install required modules
pip install -r requirements.txt
```

## Machine Learning Model
Python scripts related to defining, training, and implementing the machine learning model are contained within the `cgi-bin` folder. 

A convolutional neural network (CNN) is defined within the `model.py` module using the [TFLearn](http://tflearn.org/) library. This model is designed for MNIST image input. 

The defined CNN can be trained against the MNIST dataset by running the `train.py` script. This script will automaticallly load the MNIST dataset from the TFLearn library to use as input, and the trained model's parameter files are saved into the `models` directory. Pre-trained model files are made available in this directory already.

The `mnist.py` script implements this trained model against the user's handdrawn input. 

# Usage
To launch the website, begin by starting a Python server from the repository folder:
```bash
# Start Python server
python -m http.server --cgi 8000
```
Then open a browser and navigate to `http://localhost:8000/index.html` to view it. 

An example of the website's interface is shown below. Users are guided to draw a digit (0-9) on the empty canvas and then hit the 'Predict' button to process their drawing. Allow up to 1 minute for the processing to complete. Any errors during processing will be indicated with a warning icon and printed to the console. 

Results are displayed as a bar graph where each classification label recieves a score between 0.0 and 1.0 from the machine learning model. Clear the canvas with the 'Clear' button to draw and process other digits.  

Interface example: 
<p>
<img src="http://i.imgur.com/fmIa0e5.gif" width="600">
</p>

