import { EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  Exercise: {
    selectId: (exercise) => exercise.id,
  },
  Auth: {
    selectId: (auth) => auth.localId,
  },
};

export const entityConfig = {
  entityMetadata,
};
