import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

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

group.add(cube1, cube2, cube3)

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
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Sizes
const sizes = {
  width: 600,
  height: 400
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(mesh.position)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)

// const clock = new THREE.Clock()
//

gsap.to(group.position, { x: 2, duration: 1, delay: 1 })
gsap.to(group.position, { x: 0, duration: 1, delay: 2 })

const render = () => {
  // const elapsedTime = clock.getElapsedTime()
  requestAnimationFrame(render)
  // // group.rotation.y = (elapsedTime * Math.PI) / 2
  // // group.position.y = Math.sin(elapsedTime)
  // group.position.x = Math.cos(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)
  // camera.lookAt(group.position)
  // camera.position.z = Math.cos(elapsedTime)
  renderer.render(scene, camera)
}
requestAnimationFrame(render)
