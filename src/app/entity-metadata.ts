import { EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  Exercise: {},
  FinishedExercise: {},
  Auth: {
    selectId: (auth) => auth.localId,
  },
};

export const entityConfig = {
  entityMetadata,
};
