import { rest, setupWorker } from 'msw';

const handlers = [
  rest.get(`http://54.209.16.194:8080/question/?page=0`, (req, res, ctx) => {
    // const { username } = req.body

    return res(
      ctx.json({
        success: true,
        data: {
          content: [
            {
              id: 1,
              title: 'context switching의 개념과 언제 발생하는지 설명해 주세요',
              type: 'os',
              status: true,
            },
            {
              id: 2,
              title: '오버라이딩과 오버로딩이 무엇이며 어떤 차이가 있을까요',
              type: 'java',
              status: true,
            },
            {
              id: 3,
              title: 'GC가 무엇인지, 필요한 이유는 무엇인지 설명해주세요.',
              type: 'java',
              status: true,
            },
            {
              id: 4,
              title:
                '물리적 메모리에서 프로그램이 어떤 주소 공간으로 형성되어 있는지 설명해 주세요',
              type: 'os',
              status: true,
            },
            { id: 5, title: '클래스는 무엇이고 객체는 무엇인가요?', type: 'java', status: true },
          ],
          pageable: {
            sort: { sorted: false, unsorted: true, empty: true },
            offset: 0,
            pageNumber: 0,
            pageSize: 10,
            paged: true,
            unpaged: false,
          },
          last: false,
          totalPages: 3,
          totalElements: 21,
          size: 10,
          number: 0,
          sort: { sorted: false, unsorted: true, empty: true },
          numberOfElements: 10,
          first: true,
          empty: false,
        },
      })
    );
  }),
];

export const worker = setupWorker(...handlers);
