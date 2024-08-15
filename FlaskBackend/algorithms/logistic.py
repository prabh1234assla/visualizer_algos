import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

# Generate a synthetic dataset
X, y = make_classification(n_samples=100, n_features=1, n_informative=1, n_redundant=0, n_clusters_per_class=1, random_state=42)

# Split the dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a logistic regression model
model = LogisticRegression()

# Fit the model on the training data
model.fit(X_train, y_train)

# Predict probabilities for test data
y_pred_proba = model.predict_proba(X_test)[:, 1]

# Plot the decision boundary and the data points
plt.figure(figsize=(8, 6))
plt.scatter(X_train, y_train, color='blue', marker='o', label='Training data')
plt.scatter(X_test, y_test, color='green', marker='s', label='Test data')
plt.plot(X_test, y_pred_proba, color='red', label='Logistic Regression')
plt.xlabel('Feature')
plt.ylabel('Target')
plt.title('Logistic Regression')
plt.legend()
plt.show()

# Evaluate the model
threshold = 0.5
y_pred = np.where(y_pred_proba > threshold, 1, 0)
print('Classification Report:')
print(classification_report(y_test, y_pred))

# Confusion matrix
print('Confusion Matrix:')
print(confusion_matrix(y_test, y_pred))
