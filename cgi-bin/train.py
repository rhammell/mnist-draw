"""
Train and export machine learning model using MNIST dataset
"""

from model import model


# Data loading and preprocessing
import tflearn.datasets.mnist as mnist
X, Y, testX, testY = mnist.load_data(one_hot=True)
X = X.reshape([-1, 28, 28, 1])
testX = testX.reshape([-1, 28, 28, 1])

# Train the model
model.fit({'input': X}, {'target': Y}, n_epoch=20, shuffle=True,
           validation_set=({'input': testX}, {'target': testY}),
           show_metric=True, batch_size=128, run_id='convnet_mnist')

# Save trained model
model.save("models/model.tfl")