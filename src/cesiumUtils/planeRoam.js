import Cesium from '@/cesiumUtils/cesium'
import getPath from '@/cesiumUtils/aircraftPath'
import DrawLines from '@/cesiumUtils/drawLinesOld'
import ImportModel from '@/cesiumUtils/importModelOld'

const baseObj = {}
const radarObj = {}

const viewPosition = [98.5, 25.2]

let planeModel
let traceEntities = []
let thisLineIns

// 放置飞机和路线
export const drawLinesAndAirplane = (viewer) => {
  // 生成该位置附近的路线点
  const arr = getPath(...viewPosition)
  // 生成飞机(第一个点放置飞机)
  // eslint-disable-next-line no-use-before-define
  planeModel = importModel(viewer, '/models/CesiumDrone.glb', arr.slice(0, 3), {
    id: 'airPlane',
    model: {
      minimumPixelSize: 50,
      runAnimations: true
    }
  })
  const valuesOfRadarObj = Object.values(radarObj)
  traceEntities = valuesOfRadarObj.map((value, i) => {
    // 各节点两点连接
    // if (i !== valuesOfRadarObj.length - 1) {
    //   const nextEntity = valuesOfRadarObj[i + 1].entity
    //   value.traceTarget(nextEntity)
    // }
    return value.entity
  })
  planeModel.traceTarget(traceEntities)
  // 路线
  thisLineIns = new DrawLines(viewer, {
    lines: arr,
    showPoint: false,
    model: planeModel.entity
  })
  setTimeout(() => {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        ...viewPosition,
        50000
      ),
      orientation: {
      // 指向
        heading: Cesium.Math.toRadians(0, 0),
        // 视角
        pitch: Cesium.Math.toRadians(-45),
        roll: 0.0
      }
    })
  }, 500)
}

function importModel(viewer, uri, position, conf, lineConf) {
  return new ImportModel(viewer, {
    uri,
    position,
    conf,
    lineConf
  })
}

// 放置ld和节点(分中心和站点)
export const settleBaseRadarCarRadio = (viewer) => {
  // eslint-disable-next-line no-use-before-define
  const data = getTargetsData()
  const newData = data.reduce((init, current) => {
    const { children = [] } = current
    if (children.length) {
      init.push(...children)
    }
    return init
  }, [])
  newData.forEach((node) => {
    const baseUri = Math.random() < 0.5 ? `/models/Factory Complex.glb` : `/models/Office Building.glb`
    if (node.label.includes('基地')) {
      baseObj[node.id] = importModel(viewer, baseUri, node.position, {
        id: node.id,
        name: node.label,
        text: node.label,
        pixelOffset: new Cesium.Cartesian2(0, -100),
        model: {
          scale: 1000
        }
      })
    } else if (node.label.includes('雷达')) {
      radarObj[node.id] = importModel(viewer, `/models/radar_dynamic.glb`, node.position, {
        id: node.id,
        name: node.label,
        text: '',
        pixelOffset: new Cesium.Cartesian2(0, -50),
        model: {
          scale: 3
        }
      })
    }
  })
}

function getRandomPosition(pos, r) {
  const random = Math.random()
  const isPlus = random > 0.5
  if (isPlus) {
    return pos + random / r
  }
  return pos - random / r
}

function setBasePosition(data) {
  data.forEach((item) => {
    if (item.position && item.children) {
      item.children.forEach((issue) => {
        const parentPos = item.position
        if (issue.label.includes('基地')) {
          issue.position = parentPos
        } else if (issue.label.includes('雷达')) {
          issue.position = parentPos.map((l) => {
            return l ? getRandomPosition(l, 10) : l
          })
        }
      })
    }
    if (item && item.children && item.children.length) {
      setBasePosition(item.children)
    }
  })
}

function getTargetsData(basePos = viewPosition) {
  const lon = basePos[0]
  const lat = basePos[1]
  const data = [
    {
      id: 'jd1-1',
      label: '1-1',
      position: [lon - 0.202, lat - 0.12, 0],
      children: [{
        id: 'jd1-1jd',
        label: '1-1基地'
      }, {
        id: 'jd1-1ld',
        label: '1-1雷达'
      }]
    },
    {
      id: 'jd1-2',
      label: '1-2',
      position: [lon + 0.3342, lat - 0.19, 0],
      children: [{
        id: 'jd1-2jd',
        label: '1-2基地'
      }, {
        id: 'jd1-2ld',
        label: '1-2雷达'
      }]
    },
    {
      id: 'jd1-3',
      label: '1-3',
      position: [lon + 0.4942, lat - 0.07, 0],
      children: [{
        id: 'jd1-3jd',
        label: '1-3基地'
      }, {
        id: 'jd1-3ld',
        label: '1-3雷达'
      }]
    },
    {
      id: 'jd1-4',
      label: '1-4',
      position: [lon + 0.3342, lat + 0.45, 0],
      children: [{
        id: 'jd1-4jd',
        label: '1-4基地'
      }, {
        id: 'jd1-4ld',
        label: '1-4雷达'
      }]
    }
  ]
  setBasePosition(data)
  return data
}

export const destoryDrone = (viewer) => {
  traceEntities.forEach((entity) => {
    viewer.entities.remove(entity)
  })
  Object.values(baseObj).forEach((base) => {
    viewer.entities.remove(base.entity)
  })
  if (thisLineIns) {
    thisLineIns.removeLine()
  }
  if (planeModel?.entity) {
    viewer.entities.remove(planeModel.entity)
    planeModel.destroyWaveAndOnTickListener()
  }
}

