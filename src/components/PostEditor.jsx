import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import Card from './Card';
import Toast from './Toast';
import constants from '../utils/constants';

const PostEditor = ({
  initialTitle = '',
  initialContent = '',
  initialStatus = constants.DOCUMENT_STATUS.DRAFT,
  onSave,
  onCancel,
  isSaving = false,
  saveError = null,
  className = ''
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave({
        title,
        content,
        status: initialStatus
      });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handlePublish = async () => {
    try {
      await onSave({
        title,
        content,
        status: constants.DOCUMENT_STATUS.PUBLISHED
      });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  return (
    <div className={className}>
      <Card title={initialTitle ? "Edit Post" : "Create New Post"}>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            required
            fullWidth
            className="mb-4"
          />

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {saveError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    {saveError}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Draft'
              )}
            </Button>
            {initialStatus !== constants.DOCUMENT_STATUS.PUBLISHED && (
              <Button
                type="button"
                onClick={handlePublish}
                disabled={isSaving}
              >
                Publish
              </Button>
            )}
          </div>
        </form>
      </Card>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
};

PostEditor.propTypes = {
  initialTitle: PropTypes.string,
  initialContent: PropTypes.string,
  initialStatus: PropTypes.oneOf([
    constants.DOCUMENT_STATUS.DRAFT,
    constants.DOCUMENT_STATUS.PUBLISHED,
    constants.DOCUMENT_STATUS.ARCHIVED
  ]),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  saveError: PropTypes.string,
  className: PropTypes.string
};

export default PostEditor;