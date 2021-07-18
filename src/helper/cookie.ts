const cookie = {
  /**
   * 读取 cookie
   *
   * @param name 要读取 cookie 里的 name 值
   * @returns 返回 name 值对应的 value
   */
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
