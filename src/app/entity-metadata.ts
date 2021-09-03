import { EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  Exercise: {},
  Auth: {
    selectId: (auth) => auth.localId,
  },
};

export const entityConfig = {
  entityMetadata,
};
