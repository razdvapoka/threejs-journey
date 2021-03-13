import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import gsap from 'gsap'
//
//
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else {
      if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen()
      }
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else {
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }
})

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = e.clientY / sizes.height - 0.5
})

// Scene
const scene = new THREE.Scene()

// Cubes
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000
// })

const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = 1.5

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = -1.5

// group.add(cube1, cube2, cube3)
group.add(cube1)

// group.position.y = 1
// group.scale.y = 2
// group.rotation.y = 1

// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// mesh.position.set(0.7, -0.6, 1)
// mesh.scale.set(2, 0.5, 0.5)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = Math.PI * 0.25
//
// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
// const aspectRatio = sizes.width / sizes.height
// console.log(aspectRatio)
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2

scene.add(camera)

// camera.lookAt(mesh.position)
camera.lookAt(cube1.position)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
// controls.update()
// controls.enabled = false

controls.enableDamping = true

// const clock = new THREE.Clock()
//

// gsap.to(camera, { fov: 150, duration: 3, delay: 1 })
// gsap.to(camera, { fov: 50, duration: 3, delay: 4 })

const render = () => {
  // const elapsedTime = clock.getElapsedTime()
  requestAnimationFrame(render)
  controls.update()
  // group.rotation.y = 2 * elapsedTime

  // camera.position.x = 2 * Math.sin(cursor.x * Math.PI * 2)
  // camera.position.z = 2 * Math.cos(cursor.x * Math.PI * 2)
  // camera.position.y = -cursor.y * 5
  // camera.lookAt(group.position)

  // camera.updateProjectionMatrix()
  // // group.rotation.y = (elapsedTime * Math.PI) / 2
  // group.rotation.x = Math.sin(elapsedTime) * Math.PI * 2
  // group.position.x = Math.cos(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)
  // camera.lookAt(group.position)
  // camera.position.z = Math.cos(elapsedTime)
  renderer.render(scene, camera)
}
requestAnimationFrame(render)
