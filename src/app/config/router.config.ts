import {StateTree} from "@uirouter/visualizer";
import {UIRouter} from "@uirouter/angular";

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter) {
  // If no URL matches, go to the `PrintXpress` state by default
  router.urlService.rules.otherwise({ state: 'Catalog' });

  // StateTree.create(router, document.getElementById('statetree'), { width: 200, height: 100 });
}