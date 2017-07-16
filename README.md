# mnist-draw
This repository contains a single page website that enables users to draw and classify digits (0-9) using machine learning. 

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
![mnist-draw](http://imgur.com/LrSOTXm.gif)


<p>
<img src="http://i.imgur.com/WacLk6N.gif" width="600">
</p>



