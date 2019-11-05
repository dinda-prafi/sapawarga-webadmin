import flushPromises from 'flush-promises'
import nock from 'nock'
import { fetchList, fetchRecord, create } from '@/api/newsChannels'

describe('API News Channel', () => {
  const errResponse = {
    success: false,
    status: 422,
    data: [
      {
        name: ['Judul sudah digunakan'],
        website: ['URL sudah digunakan']
      }
    ]
  }

  it('handle error duplicate title', async() => {
    delete errResponse.data.website
    let errReceived, result
    const request = nock('http://localhost')
      .post('/news-channels')
      .reply(422, errResponse)

    try {
      result = await create({
        name: 'tribun',
        website: 'https://tribun.com',
        icon_url: 'https://tribun.com/icon.png',
        status: 10
      })
      await flushPromises()
    } catch (error) {
      errReceived = error.response.data
    }

    expect(result).not.toBeDefined()
    expect(errReceived).not.toBeDefined()
    expect(errResponse.success).toBeFalsy()
    expect(errResponse.status).toBe(422)
    expect(errResponse.data.name).toEqual(errResponse.data.name)
    expect(errResponse.data.website).not.toBeDefined()
    expect(request.isDone()).toBe(true)
  })

  it('handle error duplicate URL', async() => {
    delete errResponse.data.name
    let errReceived, result
    const request = nock('http://localhost')
      .post('/news-channels')
      .reply(422, errResponse)

    try {
      result = await create({
        name: 'tribun',
        website: 'https://tribun.com',
        icon_url: 'https://tribun.com/icon.png',
        status: 10
      })
      await flushPromises()
    } catch (error) {
      errReceived = error.response.data
    }

    expect(result).not.toBeDefined()
    expect(errReceived).not.toBeDefined()
    expect(errResponse.success).toBeFalsy()
    expect(errResponse.status).toBe(422)
    expect(errResponse.data.website).toEqual(errResponse.data.website)
    expect(errResponse.data.name).not.toBeDefined()
    expect(request.isDone()).toBe(true)
  })
})
