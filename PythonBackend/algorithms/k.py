import gzip
import numpy as np
import matplotlib.pyplot as plt

# Function to load MNIST data
def load_data(filename, num_images):
    with gzip.open(filename, 'rb') as f:
        data = np.frombuffer(f.read(), np.uint8, offset=16)
    data = data.reshape(num_images, 28, 28)
    return data

# Load training data
X_train = load_data('train-images-idx3-ubyte.gz', 60000)
y_train = load_data('train-labels-idx1-ubyte.gz', 60000)

# Load test data (optional)
X_test = load_data('t10k-images-idx3-ubyte.gz', 10000)
y_test = load_data('t10k-labels-idx1-ubyte.gz', 10000)

# Plotting the images
num_images = 5

plt.figure(figsize=(10, 5))
for i in range(num_images):
    plt.subplot(1, num_images, i+1)
    plt.imshow(X_train[i], cmap='gray')
    plt.title(f'Label: {y_train[i]}')
    plt.axis('off')

plt.tight_layout()
plt.show()
