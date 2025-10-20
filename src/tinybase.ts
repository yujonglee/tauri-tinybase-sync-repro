import { createBroadcastChannelSynchronizer } from "tinybase/synchronizers/synchronizer-broadcast-channel/with-schemas";
import * as _UI from "tinybase/ui-react/with-schemas";
import { createMergeableStore, type MergeableStore, type TablesSchema, ValuesSchema } from "tinybase/with-schemas";

const SCHEMA = {
  value: {} as const satisfies ValuesSchema,
  table: {
    demo: { value: { type: "string" } },
  } as const satisfies TablesSchema,
};

export const TABLES = Object.keys(SCHEMA.table) as (keyof typeof SCHEMA.table)[];

const {
  useCreateMergeableStore,
  useCreateSynchronizer,
  useProvideStore,
  useProvideSynchronizer,
} = _UI as _UI.WithSchemas<Schemas>;

export const UI = _UI as _UI.WithSchemas<Schemas>;
export type Store = MergeableStore<Schemas>;
export type Schemas = [typeof SCHEMA.table, typeof SCHEMA.value];

export const STORE_ID = "store";

export const StoreComponent = () => {
  const store = useCreateMergeableStore(() =>
    createMergeableStore()
      .setTablesSchema(SCHEMA.table)
      .setValuesSchema(SCHEMA.value)
  );

  const synchronizer = useCreateSynchronizer(
    store,
    async (store) =>
      createBroadcastChannelSynchronizer(
        store,
        "hypr-sync",
        console.log,
        console.log,
        console.error,
      ),
    [],
    (sync) => sync.startSync().then(console.log).catch(console.error),
  );

  useProvideStore(STORE_ID, store);
  useProvideSynchronizer(STORE_ID, synchronizer);

  return null;
};
