import { EntityMetadataMap } from "@ngrx/data";
import { sortFinishedExercise } from "./training/exercise.model";

const entityMetadata: EntityMetadataMap = {
  Exercise: {
    entityDispatcherOptions: {
      optimisticDelete: true,
      optimisticUpdate: true,
    },
  },
  FinishedExercise: {
    sortComparer: sortFinishedExercise,
    entityDispatcherOptions: {
      optimisticDelete: true,
      optimisticUpdate: true,
    },
  },
  Auth: {
    selectId: (auth) => auth.localId,
    entityDispatcherOptions: {
      optimisticDelete: true,
      optimisticUpdate: true,
    },
  },
};

export const entityConfig = {
  entityMetadata,
};
