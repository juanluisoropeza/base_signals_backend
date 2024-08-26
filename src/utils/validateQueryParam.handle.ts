import mongoose from 'mongoose';

const validateCorrectIdQueryParam = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  return true;
};

export { validateCorrectIdQueryParam };
