export const DIMENSIONS = { width: 225, height: 150 };

/**
 * Example circuit used to make the tour
 */
export default {
  "id": "tour-circuit",
  "name": "Logossim's tour circuit",
  "createdAt": "2021-08-31T11:45:57.360Z",
  "updatedAt": "2021-08-31T11:51:16.571Z",
  "circuit": {
    "id": "tour-circuit",
    "locked": false,
    "offsetX": 0,
    "offsetY": 0,
    "zoom": 100,
    "gridSize": 15,
    "layers": [
      {
        "id": "0bfedf94-3516-429a-a859-894255c89c54",
        "type": "diagram-links",
        "isSvg": true,
        "transformed": true,
        "models": {
          "clock-out-link": {
            "id": "clock-out-link",
            "type": "link",
            "selected": false,
            "source": "ce8b474f-4cbc-4f5d-8ff2-6f00101a68cb",
            "sourcePort": "57f060f7-677b-4816-9caa-70651725ec86",
            "target": "749e3305-513e-4f56-b40e-6a078a711037",
            "targetPort": "b0d95cb4-3b5c-49b8-b021-d193d01d5173",
            "points": [
              {
                "id": "6c849dfe-63b6-4105-bce2-2dd1270770c6",
                "type": "point",
                "x": 45,
                "y": 15
              },
              {
                "id": "0e221837-e448-4e2b-90e8-81a869dbce47",
                "type": "point",
                "x": 75,
                "y": 15
              }
            ],
            "labels": [],
            "bifurcations": [],
            "bifurcationSource": null,
            "bifurcationTarget": null,
            "value": null,
            "bits": 1
          },
          "0cf0dc65-0657-407f-839a-5775a533b5fb": {
            "id": "0cf0dc65-0657-407f-839a-5775a533b5fb",
            "type": "link",
            "selected": false,
            "source": "413c2345-2773-420d-89cb-17ea52c647a1",
            "sourcePort": "4794aa9e-c8e8-4798-badb-0d87f8c78fb0",
            "target": "749e3305-513e-4f56-b40e-6a078a711037",
            "targetPort": "9709ee67-be21-435c-979d-1c1f3e1368a1",
            "points": [
              {
                "id": "17d4d01c-8d97-47c4-87b6-f9e1a655fcb4",
                "type": "point",
                "x": 45,
                "y": 75
              },
              {
                "id": "c3eedb98-5456-4012-ad2f-a8a18b2f4238",
                "type": "point",
                "x": 75,
                "y": 75
              }
            ],
            "labels": [],
            "bifurcations": [
              "not-in-link"
            ],
            "bifurcationSource": null,
            "bifurcationTarget": null,
            "value": null,
            "bits": 1
          },
          "not-in-link": {
            "id": "not-in-link",
            "type": "link",
            "selected": false,
            "source": null,
            "sourcePort": null,
            "target": "6e7dffe7-8620-4e3c-ae44-cb648793b886",
            "targetPort": "bfbaf47f-eb81-457a-9f3e-f6c6cd64d1f3",
            "points": [
              {
                "id": "4e807ea1-a334-49af-bdbe-04bfae5d6793",
                "type": "point",
                "x": 60,
                "y": 75
              },
              {
                "id": "7a99f9ea-8684-4021-a549-6af348140e14",
                "type": "point",
                "x": 60,
                "y": 135
              },
              {
                "id": "983f7920-130a-4a3c-ae26-d8d1430ec280",
                "type": "point",
                "x": 90,
                "y": 135
              }
            ],
            "labels": [],
            "bifurcations": [],
            "bifurcationSource": "0cf0dc65-0657-407f-839a-5775a533b5fb",
            "bifurcationTarget": null,
            "value": null,
            "bits": 1
          },
          "0de8b598-2a79-4dda-a4c4-c8465a957a65": {
            "id": "0de8b598-2a79-4dda-a4c4-c8465a957a65",
            "type": "link",
            "selected": false,
            "source": "749e3305-513e-4f56-b40e-6a078a711037",
            "sourcePort": "f082894e-4648-472f-ad8d-6e7754a1e9d7",
            "target": null,
            "targetPort": null,
            "points": [
              {
                "id": "5ce9a4a4-9a17-4f9c-98bb-7798fa1beb7b",
                "type": "point",
                "x": 195,
                "y": 45
              },
              {
                "id": "0c11595e-4000-42f1-b458-b366594fcf0d",
                "type": "point",
                "x": 225,
                "y": 45
              }
            ],
            "labels": [],
            "bifurcations": [],
            "bifurcationSource": null,
            "bifurcationTarget": null,
            "value": null,
            "bits": 1
          },
          "7ac6f5ea-29e6-4ff4-b892-de5128de9cab": {
            "id": "7ac6f5ea-29e6-4ff4-b892-de5128de9cab",
            "type": "link",
            "selected": false,
            "source": "6e7dffe7-8620-4e3c-ae44-cb648793b886",
            "sourcePort": "6336f3f8-2fa4-4e6c-8f32-cd710d07a7f3",
            "target": null,
            "targetPort": null,
            "points": [
              {
                "id": "4e97a9c7-080d-4b91-a137-b9671224dffd",
                "type": "point",
                "x": 165,
                "y": 135
              },
              {
                "id": "3446757e-ea37-4a5c-bc98-c7a56429eecd",
                "type": "point",
                "x": 225,
                "y": 135
              }
            ],
            "labels": [],
            "bifurcations": [],
            "bifurcationSource": null,
            "bifurcationTarget": null,
            "value": null,
            "bits": 1
          }
        }
      },
      {
        "id": "5f9a87d5-4d2a-4c20-a1c6-c965c5f60389",
        "type": "diagram-nodes",
        "isSvg": false,
        "transformed": true,
        "models": {
          "749e3305-513e-4f56-b40e-6a078a711037": {
            "id": "749e3305-513e-4f56-b40e-6a078a711037",
            "type": "And",
            "selected": false,
            "x": 90,
            "y": 0,
            "ports": [
              {
                "id": "b0d95cb4-3b5c-49b8-b021-d193d01d5173",
                "type": "Port",
                "selected": false,
                "x": 70,
                "y": 10,
                "name": "in0",
                "parentNode": "749e3305-513e-4f56-b40e-6a078a711037",
                "links": [
                  "clock-out-link"
                ],
                "input": true,
                "value": null,
                "bits": 1,
                "defaultFloatingValue": "x",
                "defaultErrorValue": "e",
                "orientation": 2,
                "complemented": false,
                "offset": 2,
                "length": 10
              },
              {
                "id": "9709ee67-be21-435c-979d-1c1f3e1368a1",
                "type": "Port",
                "selected": false,
                "x": 70,
                "y": 70,
                "name": "in1",
                "parentNode": "749e3305-513e-4f56-b40e-6a078a711037",
                "links": [
                  "0cf0dc65-0657-407f-839a-5775a533b5fb"
                ],
                "input": true,
                "value": null,
                "bits": 1,
                "defaultFloatingValue": "x",
                "defaultErrorValue": "e",
                "orientation": 2,
                "complemented": false,
                "offset": 2,
                "length": 10
              },
              {
                "id": "f082894e-4648-472f-ad8d-6e7754a1e9d7",
                "type": "Port",
                "selected": false,
                "x": 190,
                "y": 40,
                "name": "out",
                "parentNode": "749e3305-513e-4f56-b40e-6a078a711037",
                "links": [
                  "0de8b598-2a79-4dda-a4c4-c8465a957a65"
                ],
                "input": false,
                "value": null,
                "bits": 1,
                "defaultFloatingValue": "x",
                "defaultErrorValue": "e",
                "orientation": 0,
                "complemented": false,
                "offset": 2,
                "length": 10
              }
            ],
            "configurations": {
              "INPUT_PORTS_NUMBER": 2,
              "DATA_BITS": "1",
              "ORIENTATION": 0
            }
          },
          "ce8b474f-4cbc-4f5d-8ff2-6f00101a68cb": {
            "id": "ce8b474f-4cbc-4f5d-8ff2-6f00101a68cb",
            "type": "Clock",
            "selected": false,
            "x": 0,
            "y": 0,
            "ports": [
              {
                "id": "57f060f7-677b-4816-9caa-70651725ec86",
                "type": "Port",
                "selected": false,
                "x": 40,
                "y": 10,
                "name": "out",
                "parentNode": "ce8b474f-4cbc-4f5d-8ff2-6f00101a68cb",
                "links": [
                  "clock-out-link"
                ],
                "input": false,
                "value": null,
                "bits": 1,
                "defaultFloatingValue": "x",
                "defaultErrorValue": "e",
                "orientation": 0,
                "complemented": false,
                "offset": 0,
                "length": 10
              }
            ],
            "configurations": {
              "FREQUENCY_HZ": 1,
              "HIGH_DURATION": 1,
              "LOW_DURATION": 1,
              "ORIENTATION": 0
            }
          },
          "413c2345-2773-420d-89cb-17ea52c647a1": {
            "id": "413c2345-2773-420d-89cb-17ea52c647a1",
            "type": "Button",
            "selected": false,
            "x": 0,
            "y": 60,
            "ports": [
              {
                "id": "4794aa9e-c8e8-4798-badb-0d87f8c78fb0",
                "type": "Port",
                "selected": false,
                "x": 40,
                "y": 70,
                "name": "out",
                "parentNode": "413c2345-2773-420d-89cb-17ea52c647a1",
                "links": [
                  "0cf0dc65-0657-407f-839a-5775a533b5fb"
                ],
                "input": false,
                "value": null,
                "bits": 1,
                "defaultFloatingValue": "x",
                "defaultErrorValue": "e",
                "orientation": 0,
                "complemented": false,
                "offset": 0,
                "length": 10
              }
            ],
            "configurations": {
              "ORIENTATION": 0
            }
          },
          "6e7dffe7-8620-4e3c-ae44-cb648793b886": {
            "id": "6e7dffe7-8620-4e3c-ae44-cb648793b886",
            "type": "Not",
            "selected": false,
            "x": 105,
            "y": 120,
            "ports": [
              {
                "id": "bfbaf47f-eb81-457a-9f3e-f6c6cd64d1f3",
                "type": "Port",
                "selected": false,
                "x": 105,
                "y": 130,
                "name": "in",
                "parentNode": "6e7dffe7-8620-4e3c-ae44-cb648793b886",
                "links": [
                  "not-in-link"
                ],
                "input": true,
                "value": null,
                "bits": 1,
                "defaultFloatingValue": "x",
                "defaultErrorValue": "e",
                "orientation": 2,
                "complemented": false,
                "offset": 0,
                "length": 10
              },
              {
                "id": "6336f3f8-2fa4-4e6c-8f32-cd710d07a7f3",
                "type": "Port",
                "selected": false,
                "x": 160,
                "y": 130,
                "name": "out",
                "parentNode": "6e7dffe7-8620-4e3c-ae44-cb648793b886",
                "links": [
                  "7ac6f5ea-29e6-4ff4-b892-de5128de9cab"
                ],
                "input": false,
                "value": null,
                "bits": 1,
                "defaultFloatingValue": "x",
                "defaultErrorValue": "e",
                "orientation": 0,
                "complemented": false,
                "offset": 2,
                "length": 14
              }
            ],
            "configurations": {
              "DATA_BITS": "1",
              "ORIENTATION": 0
            }
          }
        }
      }
    ]
  }
};
