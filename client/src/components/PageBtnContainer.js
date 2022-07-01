import { useDispatch, useSelector } from 'react-redux';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { changePage } from '../features/job/jobSlice';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
  const dispatch = useDispatch();
  const { numOfPages, page } = useSelector((store) => store.job);
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const pageRange = (page, pageCount) => {
    let start = page - 2;
    let end = page + 2;

    if (end > pageCount) {
      start -= end - pageCount;
      end = pageCount;
    }
    if (start <= 0) {
      end += (start - 1) * -1;
      start = 1;
    }

    end = end > pageCount ? pageCount : end;

    return { start: start, end: end };
  };

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          const range = pageRange(page, numOfPages);
          if (pageNumber >= range.start && pageNumber <= range.end) {
            return (
              <button
                type='button'
                className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                key={pageNumber}
                onClick={() => dispatch(changePage(pageNumber))}
              >
                {pageNumber}
              </button>
            );
          } else {
            return null;
          }
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
